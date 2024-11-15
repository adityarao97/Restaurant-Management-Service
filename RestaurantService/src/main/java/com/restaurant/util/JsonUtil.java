package com.restaurant.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void printAsJson(Object object) {
        try {
            String json = objectMapper.writeValueAsString(object);
            System.out.println(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

