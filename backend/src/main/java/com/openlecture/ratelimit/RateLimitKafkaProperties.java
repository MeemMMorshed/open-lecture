package com.openlecture.ratelimit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.rate-limit.kafka")
public class RateLimitKafkaProperties {
    private boolean enabled;
    private String topic = "openlecture.rate-limit-events";

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
}
