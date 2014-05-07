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
						return room;
					}
				});
	}

	public List<Room> find(int startIndex) {
		return jdbcTemplate
				.query("select id,title,capacity,currentSize,password from t_room limit ? offset ?",
						new RowMapper<Room>() {
							@Override
							public Room mapRow(ResultSet rs, int rowNum)
									throws SQLException {
								Room room = new Room();
								room.setId(rs.getInt("id"));
								room.setTitle(rs.getString("title"));
								room.setCapacity(rs.getInt("capacity"));
								room.setCurrentSize(rs.getInt("currentSize"));
								return room;
							}
						}, 6, startIndex);
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
								return room;
							}
						}, title);
		if (list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	public Room findByRoomId(int roomId) {
		List<Room> list = jdbcTemplate
				.query("select id,title,capacity,currentSize,password from t_room where id=?",
						new RowMapper<Room>() {
							@Override
							public Room mapRow(ResultSet rs, int rowNum)
									throws SQLException {
								Room room = new Room();
								room.setId(rs.getInt("id"));
								room.setTitle(rs.getString("title"));
								room.setCapacity(rs.getInt("capacity"));
								room.setCurrentSize(rs.getInt("currentSize"));
								return room;
							}
						}, roomId);
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

	public void updateByRoomId(Room room) {
		jdbcTemplate
				.update("update t_room set title=?,capacity=?,currentSize=?  where id=?",
						room.getTitle(), room.getCapacity(),
						room.getCurrentSize(), room.getId());
	}

	public void deleteRoomById(int roomId) {
		jdbcTemplate.update("delete from t_room where id=?", roomId);
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
