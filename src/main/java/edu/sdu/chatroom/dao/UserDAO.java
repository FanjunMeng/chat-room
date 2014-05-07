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
		List<User> list = jdbcTemplate
				.query("select name,password,email,isAdmin,iconPath from t_user where name=?",
						new RowMapper<User>() {
							@Override
							public User mapRow(ResultSet rs, int rowNum)
									throws SQLException {
								User user = new User();
								user.setName(rs.getString("name"));
								user.setPassword(rs.getString("password"));
								user.setEmail(rs.getString("email"));
								user.setAdmin(rs.getBoolean("isAdmin"));
								user.setIconPath(rs.getString("iconPath"));
								return user;
							}
						}, name);
		if (list.size() == 0) {
			return null;
		}
		return list.get(0);
	}

	public User findByEmail(String email) {
		List<User> list = jdbcTemplate
				.query("select name,password,email,isAdmin,iconPath from t_user where email=?",
						new RowMapper<User>() {
							@Override
							public User mapRow(ResultSet rs, int rowNum)
									throws SQLException {
								User user = new User();
								user.setName(rs.getString("name"));
								user.setPassword(rs.getString("password"));
								user.setEmail(rs.getString("email"));
								user.setAdmin(rs.getBoolean("isAdmin"));
								user.setIconPath(rs.getString("iconPath"));
								return user;
							}
						}, email);
		if (list.size() == 0) {
			return null;
		}
		return list.get(0);
	}

	public List<User> find(int startIndex) {
		return jdbcTemplate
				.query("select name,email,isAdmin,iconPath from t_user limit ? offset ?",
						new RowMapper<User>() {
							@Override
							public User mapRow(ResultSet rs, int rowNum)
									throws SQLException {
								User user = new User();
								user.setName(rs.getString("name"));
								user.setEmail(rs.getString("email"));
								user.setAdmin(rs.getBoolean("isAdmin"));
								user.setIconPath(rs.getString("iconPath"));
								return user;
							}
						}, 6, startIndex);
	}

	public void insert(User user) {
		jdbcTemplate
				.update("insert into t_user (name,password,email,isAdmin,iconPath) values(?,?,?,?,?)",
						user.getName(), user.getPassword(), user.getEmail(),
						user.isAdmin(), "resources/img/default.png");
	}

	public void updateIconPathByName(String name, String targetName) {
		jdbcTemplate.update("update t_user set iconPath=? where name=?",
				targetName, name);
	}

	public void updatePasswordByName(String name, String newPassword) {
		jdbcTemplate.update("update t_user set password=? where name=?",
				newPassword, name);
	}

	public void deleteByName(String name) {
		jdbcTemplate.update("delete from t_user where name=?", name);
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
