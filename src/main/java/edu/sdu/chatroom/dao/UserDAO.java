package edu.sdu.chatroom.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import edu.sdu.chatroom.entity.User;

@Repository
public class UserDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public User findByName(String name) {
		List<User> list = jdbcTemplate.query(
				"select name,password,email,isAdmin from t_user where name=?",
				new RowMapper<User>() {
					@Override
					public User mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						User user = new User();
						user.setName(rs.getString("name"));
						user.setPassword(rs.getString("password"));
						user.setEmail(rs.getString("email"));
						user.setAdmin(rs.getBoolean("isAdmin"));
						return user;
					}
				}, name);
		if (list.size() == 0) {
			return null;
		}
		return list.get(0);
	}

	public User findByEmail(String email) {
		List<User> list = jdbcTemplate.query(
				"select name,password,email,isAdmin from t_user where email=?",
				new RowMapper<User>() {
					@Override
					public User mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						User user = new User();
						user.setName(rs.getString("name"));
						user.setPassword(rs.getString("password"));
						user.setEmail(rs.getString("email"));
						user.setAdmin(rs.getBoolean("isAdmin"));
						return user;
					}
				}, email);
		if (list.size() == 0) {
			return null;
		}
		return list.get(0);
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
