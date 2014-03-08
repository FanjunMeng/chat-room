package edu.sdu.chatroom.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("edu.sdu.chatroom")
@EnableAutoConfiguration
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
