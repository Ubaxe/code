package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;
public class TestPlayerMove {
	
	Dungeon dungeon;
	Player player;
	
	@Before
	public void setup() {
		dungeon = new Dungeon(3,3);
		player = new Player(dungeon, 1, 1);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
	}
	
	@Test
	public void test1() {
		player.moveUp();
		assertEquals(1, player.getX());
		assertEquals(0, player.getY());
		player.moveDown();
		assertEquals(1, player.getX());
		assertEquals(1, player.getY());
		player.moveLeft();
		assertEquals(0, player.getX());
		assertEquals(1, player.getY());
		player.moveRight();
		assertEquals(1, player.getX());
		assertEquals(1, player.getY());
		System.out.println("----Test1 Pass (player move)----");
	}
	
	@Test
	public void test2() {
		Wall w1 = new Wall(0,0);
		Wall w2 = new Wall(1,0);
		Wall w3 = new Wall(2,0);
		dungeon.addEntity(w1);
		dungeon.addEntity(w2);
		dungeon.addEntity(w3);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX()+1, player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerMove(dungeon, player, item, "Up");
		assertEquals(1, player.getX());
		assertEquals(1, player.getY());
		System.out.println("----Test2 Pass (Player move and blocked by wall)----");
	}
	
}
