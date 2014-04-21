package edu.sdu.chatroom.boot;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

@Configuration
@EnableTransactionManagement
public class DatabaseConfig implements TransactionManagementConfigurer {

	@Bean(destroyMethod = "close")
	// @Bean(destroyMethod = "shutdown")
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName("org.h2.Driver");
		dataSource.setUrl("jdbc:h2:~/chatroom");
		dataSource.setUsername("sa");
		dataSource.setPassword("");

		initDatabase(dataSource);
		return dataSource;
		// EmbeddedDatabaseBuilder db = new EmbeddedDatabaseBuilder();
		// return db.setType(EmbeddedDatabaseType.H2)
		// .addScript("edu/sdu/chatroom/boot/schema.sql")
		// .addScript("edu/sdu/chatroom/boot/data.sql").build();
	}

	private void initDatabase(BasicDataSource dataSource) {
		ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
		ResourceLoader resourceLoader = new DefaultResourceLoader();
		databasePopulator.addScript(resourceLoader
				.getResource("schema.sql"));
		databasePopulator.addScript(resourceLoader
				.getResource("data.sql"));
		DatabasePopulatorUtils.execute(databasePopulator, dataSource);
	}

	@Bean
	public JdbcTemplate jdbcTemplate() {
		return new JdbcTemplate(dataSource());
	}

	@Bean
	public PlatformTransactionManager txManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return txManager();
	}
	
	@Bean
	public LobHandler lobHandler() {
		return new DefaultLobHandler();
	}

}
