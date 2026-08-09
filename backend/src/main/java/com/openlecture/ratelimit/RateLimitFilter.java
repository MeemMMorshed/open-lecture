package com.openlecture.ratelimit;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class RateLimitFilter extends OncePerRequestFilter {
    private final RateLimitProperties properties;
    private final Optional<RateLimitEventPublisher> eventPublisher;
    private final Map<String, WindowCounter> counters = new ConcurrentHashMap<>();

    public RateLimitFilter(
            RateLimitProperties properties,
            Optional<RateLimitEventPublisher> eventPublisher) {
        this.properties = properties;
        this.eventPublisher = eventPublisher;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !properties.isEnabled() || "OPTIONS".equalsIgnoreCase(request.getMethod())
                || !request.getRequestURI().startsWith("/api/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        int limit = limitFor(path);
        long now = Instant.now().getEpochSecond();
        long windowStart = now - (now % properties.getWindowSeconds());
        String clientIp = clientIp(request);
        String key = clientIp + ':' + rateLimitGroup(path);

        WindowCounter counter = counters.compute(key, (ignored, current) -> {
            if (current == null || current.windowStart() != windowStart) {
                return new WindowCounter(windowStart, 1);
            }
            return new WindowCounter(windowStart, current.requests() + 1);
        });

        long resetAt = windowStart + properties.getWindowSeconds();
        int remaining = Math.max(0, limit - counter.requests());
        response.setHeader("X-RateLimit-Limit", Integer.toString(limit));
        response.setHeader("X-RateLimit-Remaining", Integer.toString(remaining));
        response.setHeader("X-RateLimit-Reset", Long.toString(resetAt));

        if (counter.requests() > limit) {
            response.setStatus(429);
            response.setHeader("Retry-After", Long.toString(Math.max(1, resetAt - now)));
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Too many requests. Please try again shortly.\"}");
            eventPublisher.ifPresent(publisher -> publisher.publish(clientIp, path, request.getMethod(), limit));
            return;
        }

        if (counters.size() > 10_000) {
            counters.entrySet().removeIf(entry -> entry.getValue().windowStart() < windowStart);
        }
        filterChain.doFilter(request, response);
    }

    private int limitFor(String path) {
        if (path.startsWith("/api/auth/")) {
            return properties.getAuthRequests();
        }
        if (path.startsWith("/api/courses/")) {
            return properties.getCourseRequests();
        }
        return properties.getDefaultRequests();
    }

    private String rateLimitGroup(String path) {
        if (path.startsWith("/api/auth/")) return "auth";
        if (path.startsWith("/api/courses/")) return "courses";
        return "api";
    }

    private String clientIp(HttpServletRequest request) {
        if (properties.isTrustForwardedHeaders()) {
            String forwarded = request.getHeader("X-Forwarded-For");
            if (forwarded != null && !forwarded.isBlank()) {
                return forwarded.split(",", 2)[0].trim();
            }
        }
        return request.getRemoteAddr();
    }

    private record WindowCounter(long windowStart, int requests) { }
}
