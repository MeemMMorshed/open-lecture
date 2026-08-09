package com.openlecture.ratelimit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.rate-limit")
public class RateLimitProperties {
    private boolean enabled = true;
    private int windowSeconds = 60;
    private int defaultRequests = 120;
    private int courseRequests = 60;
    private int authRequests = 10;
    private boolean trustForwardedHeaders = true;

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public int getWindowSeconds() { return windowSeconds; }
    public void setWindowSeconds(int windowSeconds) { this.windowSeconds = windowSeconds; }
    public int getDefaultRequests() { return defaultRequests; }
    public void setDefaultRequests(int defaultRequests) { this.defaultRequests = defaultRequests; }
    public int getCourseRequests() { return courseRequests; }
    public void setCourseRequests(int courseRequests) { this.courseRequests = courseRequests; }
    public int getAuthRequests() { return authRequests; }
    public void setAuthRequests(int authRequests) { this.authRequests = authRequests; }
    public boolean isTrustForwardedHeaders() { return trustForwardedHeaders; }
    public void setTrustForwardedHeaders(boolean trustForwardedHeaders) {
        this.trustForwardedHeaders = trustForwardedHeaders;
    }
}
