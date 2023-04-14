package com.movie.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.annotation.Resource;

@SpringBootTest
public class MyTest {
    @Resource
    JavaMailSenderImpl javaMailSender;
    @Test
    void contextLoads() {
        //邮件设置1：一个简单的邮件
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("通知-明天要上课");
        message.setText("4月17日上课");
        message.setFrom("18610335557@163.com");
        message.setTo("1602357810@qq.com","747861825@qq.com");
        javaMailSender.send(message);
    }
}
