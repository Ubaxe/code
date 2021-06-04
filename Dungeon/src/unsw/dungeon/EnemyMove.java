package unsw.dungeon;

import java.util.List;

public class EnemyMove implements Action {

	@Override
	public void action(Dungeon dungeon, Player player, Entity entity, String dire) {
		List<Entity> entities = dungeon.getEntities();
		for (Entity e: entities) {
			if (e instanceof Enemy) {
				Enemy enemy = (Enemy) e;
				String dire1 = null;
				if (player.getPlayerState() instanceof InvincibleState) {
					dire1 = getMaxDirection(dungeon, enemy, player);
				} else {
					dire1 = getDirection(dungeon, enemy, player);
				}
				if (dire1 == "Up") {
					enemy.moveUp();
				}
				if (dire1 == "Down") {
					enemy.moveDown();
				}
				if (dire1 == "Left") {
					enemy.moveLeft();
				}
				if (dire1 == "Right") {
					enemy.moveRight();
				}
			}
		}
	}
	
	public int getDistance(int playerX, int playerY, int enemyX, int enemyY) {
		int disX = enemyX - playerX;
		int disY = enemyY - playerY;
		int dist = disX * disX + disY * disY;
		return dist;
	}
	
	public String getDirection(Dungeon dungeon, Enemy enemy, Player player) {
		String dire = null;
		int distCurr = getDistance(player.getX(), player.getY(), enemy.getX(), enemy.getY());
		int distUp = getDistance(player.getX(), player.getY(), enemy.getX(), enemy.getY() - 1);
    	int distDown = getDistance(player.getX(), player.getY(), enemy.getX(), enemy.getY() + 1);
    	int distLeft = getDistance(player.getX(), player.getY(), enemy.getX() - 1, enemy.getY());
    	int distRight = getDistance(player.getX(), player.getY(), enemy.getX() + 1, enemy.getY());
    	int max = getDistance(0, 0, dungeon.getHeight(), dungeon.getWidth());
		if (dungeon.checkObstacle(enemy.getX(),enemy.getY() - 1, "enemy", null) == true) {
			distUp = max + 1;
		}
		if (dungeon.checkObstacle(enemy.getX(),enemy.getY() + 1,"enemy", null) == true) {
			distDown = max + 1;
		}
		if (dungeon.checkObstacle(enemy.getX() - 1,enemy.getY(),"enemy", null) == true) {
			distLeft = max + 1;
		}
		if (dungeon.checkObstacle(enemy.getX() + 1,enemy.getY(),"enemy", null) == true) {
			distRight = max + 1;
		}
		int smallest = getSmallest(distCurr, distUp, distDown, distLeft, distRight);
		if (distUp == smallest) {
			dire = "Up";
		}
		if (distDown == smallest) {
			dire = "Down";
		}
		if (distLeft == smallest) {
			dire = "Left";
		}
		if (distRight == smallest) {
			dire = "Right";
		}
		return dire;
	}
	
	public String getMaxDirection(Dungeon dungeon, Enemy enemy, Player player) {
		String dire = null;
		int distCurr = getDistance(player.getX(), player.getY(), enemy.getX(), enemy.getY());
		int distUp = getDistance(player.getX(), player.getY(), enemy.getX(), enemy.getY() - 1);
    	int distDown = getDistance(player.getX(), player.getY(), enemy.getX(), enemy.getY() + 1);
    	int distLeft = getDistance(player.getX(), player.getY(), enemy.getX() - 1, enemy.getY());
    	int distRight = getDistance(player.getX(), player.getY(), enemy.getX() + 1, enemy.getY());
		if (dungeon.checkObstacle(enemy.getX(),enemy.getY() - 1, "enemy", null) == true) {
			distUp = 0;
		}
		if (dungeon.checkObstacle(enemy.getX(),enemy.getY() + 1,"enemy", null) == true) {
			distDown = 0;
		}
		if (dungeon.checkObstacle(enemy.getX() - 1,enemy.getY(),"enemy", null) == true) {
			distLeft = 0;
		}
		if (dungeon.checkObstacle(enemy.getX() + 1,enemy.getY(),"enemy", null) == true) {
			distRight = 0;
		}
		int large = getMax(distCurr, distUp, distDown, distLeft, distRight);
		if (distUp == large) {
			dire = "Up";
		}
		if (distDown == large) {
			dire = "Down";
		}
		if (distLeft == large) {
			dire = "Left";
		}
		if (distRight == large) {
			dire = "Right";
		}
		return dire;
	}
	
	public int getSmallest(int distCurr, int distUp, int distDown, int distLeft, int distRight) {
		int smallest = distCurr;
		if (distUp < smallest) {
			smallest = distUp;
		}
		if (distDown < smallest) {
			smallest = distDown;
		}
		if (distLeft < smallest) {
			smallest = distLeft;
		} 
		if (distRight < smallest) {
			smallest = distRight;
		}
		return smallest;
	}
	
	public int getMax(int distCurr, int distUp, int distDown, int distLeft, int distRight) {
		int max = distCurr;
		if (distUp > max) {
			max = distUp;
		}
		if (distDown > max) {
			max = distDown;
		}
		if (distLeft > max) {
			max = distLeft;
		} 
		if (distRight > max) {
			max = distRight;
		}
		return max;
	}

}
