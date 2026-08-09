package com.openlecture.ratelimit;

public interface RateLimitEventPublisher {
    void publish(String clientIp, String path, String method, int limit);
}
