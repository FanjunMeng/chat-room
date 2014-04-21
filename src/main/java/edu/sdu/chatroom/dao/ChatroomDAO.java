package edu.sdu.chatroom.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import edu.sdu.chatroom.entity.Chatroom;
import edu.sdu.chatroom.entity.User;

@Repository
public class ChatroomDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Chatroom> find() {
		return jdbcTemplate.query(
				"select title,capacity,password from t_chatroom",
				new RowMapper<Chatroom>() {
					@Override
					public Chatroom mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						Chatroom chatroom = new Chatroom();
						chatroom.setTitle(rs.getString("title"));
						chatroom.setCapacity(rs.getInt("capacity"));
						chatroom.setPassword(rs.getString("password"));
						return chatroom;
					}
				});
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
