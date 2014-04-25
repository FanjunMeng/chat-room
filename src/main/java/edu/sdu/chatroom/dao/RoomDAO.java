package edu.sdu.chatroom.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import edu.sdu.chatroom.entity.Room;

@Repository
public class RoomDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Room> find() {
		return jdbcTemplate.query(
				"select id,title,capacity,currentSize,password from t_room",
				new RowMapper<Room>() {
					@Override
					public Room mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						Room room = new Room();
						room.setId(rs.getInt("id"));
						String tempTitle = rs.getString("title");
						room.setTitle(tempTitle.length() > 10 ? tempTitle
								.substring(0, 9) + "..." : tempTitle);

						room.setCapacity(rs.getInt("capacity"));
						room.setCurrentSize(rs.getInt("currentSize"));
						room.setPassword(rs.getString("password"));
						return room;
					}
				});
	}

	public Room findByTitle(String title) {
		List<Room> list = jdbcTemplate
				.query("select id,title,capacity,currentSize,password from t_room where title=?",
						new RowMapper<Room>() {
							@Override
							public Room mapRow(ResultSet rs, int rowNum)
									throws SQLException {
								Room room = new Room();
								room.setId(rs.getInt("id"));
								String tempTitle = rs.getString("title");
								room.setTitle(tempTitle.length() > 10 ? tempTitle
										.substring(0, 9) + "..."
										: tempTitle);

								room.setCapacity(rs.getInt("capacity"));
								room.setCurrentSize(rs.getInt("currentSize"));
								room.setPassword(rs.getString("password"));
								return room;
							}
						}, title);
		if (list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	public void insert(Room room) {
		jdbcTemplate
				.update("insert into t_room(title,capacity,currentSize,password) values(?,?,?,?)",
						room.getTitle(), room.getCapacity(),
						room.getCurrentSize(), room.getPassword());
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
