package com.restaurant.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class RequestResponseLoggingFilter implements Filter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Optional init configuration
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Wrap the request and response for content caching
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);

        // Log the request details
        logRequest(wrappedRequest);

        // Process the request
        chain.doFilter(wrappedRequest, wrappedResponse);

        // Log the response details
        logResponse(wrappedResponse);

        // Ensure response content is written back to the client
        wrappedResponse.copyBodyToResponse();
    }

    private void logRequest(ContentCachingRequestWrapper request) throws IOException {
        String requestBody = new String(request.getContentAsByteArray(), StandardCharsets.UTF_8);
        System.out.println("Request Method: " + request.getMethod());
        System.out.println("Request URI: " + request.getRequestURI());
        System.out.println("Request Body: " + requestBody);
    }

    private void logResponse(ContentCachingResponseWrapper response) throws IOException {
        String responseBody = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        System.out.println("Response Status: " + response.getStatus());
        System.out.println("Response Body: " + responseBody);
    }

    @Override
    public void destroy() {
        // Optional destroy configuration
    }
}
