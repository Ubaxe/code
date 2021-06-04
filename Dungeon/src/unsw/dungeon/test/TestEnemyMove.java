package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.Door;
import unsw.dungeon.Dungeon;
import unsw.dungeon.Enemy;
import unsw.dungeon.Player;

public class TestEnemyMove {
	Dungeon dungeon;
	Player player;
	Enemy enemy;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 2, 3);
		enemy = new Enemy(dungeon, 5, 4);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
		dungeon.addEntity(enemy);
	}
	@Test
	public void test1() {
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(3, player.getX());
		assertEquals(3, player.getY());
		// enemy should move from (5,4) to (4,4) which has the shortest distance to player
		assertEquals(4, enemy.getX());
		assertEquals(4, enemy.getY());
		System.out.println("----Test1 Pass (Enemy move no Block)----");
		
	}
	
	@Test
	public void test2() {
		Door door = new Door(4, 4, 2);
		dungeon.addEntity(door);
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(3, player.getX());
		assertEquals(3, player.getY());
		// enemy should move from (5,4) to (5,3) which has the shortest distance to player (4,4) shorter but blocked
		assertEquals(5, enemy.getX());
		assertEquals(3, enemy.getY());
		System.out.println("----Test2 Pass (Enemy move Block 1 way)----");
	}
	
	@Test
	public void test3() {
		Door door1 = new Door(4, 4, 2);
		Door door2 = new Door(5, 3, 4);
		dungeon.addEntity(door1);
		dungeon.addEntity(door2);
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(3, player.getX());
		assertEquals(3, player.getY());
		// enemy won't move away from player
		assertEquals(5, enemy.getX());
		assertEquals(4, enemy.getY());
		System.out.println("----Test3 Pass (Enemy move Block 2 way)----");
	}
	
	@Test
	public void test4() {
		Enemy enemy2 = new Enemy(dungeon, 3, 5);
		dungeon.addEntity(enemy2);
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(3, player.getX());
		assertEquals(3, player.getY());
		// enemy1 move from (5,4) to (4,4)
		assertEquals(4, enemy.getX());
		assertEquals(4, enemy.getY());
		// enemy2 move from (3,5) to (3,4)
		assertEquals(3, enemy2.getX());
		assertEquals(4, enemy2.getY());
		System.out.println("----Test4 Pass (2 Enemies move)----");
	}
	
	
}
