-- To Join As Admin 
-- Email:admin@gmail.com
-- Password:admin@gmail.com

drop DATABASE IF EXISTS competition_system;
CREATE DATABASE competition_system;
use competition_system;

CREATE TABLE `competitions` (
  `competition_id` int  NOT NULL,
  `competition_name` varchar(255) NOT NULL,
  `type` enum('team','solo') NOT NULL,
  `win_points` int NOT NULL,
  `lose_points` int NOT NULL,
  `draw_points` int NOT NULL,
  `no_players` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `solo` (
  `player_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `competition_id` int DEFAULT NULL,
  `competitor_name` varchar(255) NOT NULL,
  `rank` int NOT NULL DEFAULT 0,
  `stage` int NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `teams` (
  `team_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `competition_id` int DEFAULT NULL,
  `team_name` varchar(255) NOT NULL,
  `rank` int NOT NULL DEFAULT 0,
  `stage` int NOT NULL DEFAULT 1,
  `members` varchar(255) DEFAULT NULL,
  `team_leader` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('admin','competitor') DEFAULT 'competitor',
  `type` enum('team','solo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`email`, `password`, `name`, `role`) VALUES ("admin@gmail.com", "admin@gmail.com", "admin", "admin");
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`competition_id`);

ALTER TABLE `solo`
  ADD PRIMARY KEY (`player_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `competition_id` (`competition_id`);

ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `competition_id` (`competition_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `competitions`
  MODIFY `competition_id` int  NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `solo`
  MODIFY `player_id` int  NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `teams`
  MODIFY `team_id` int  NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `users`
  MODIFY `user_id` int  NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

ALTER TABLE `solo`
  ADD CONSTRAINT `solo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `solo_ibfk_2` FOREIGN KEY (`competition_id`) REFERENCES `competitions` (`competition_id`);

ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`competition_id`) REFERENCES `competitions` (`competition_id`);
COMMIT;