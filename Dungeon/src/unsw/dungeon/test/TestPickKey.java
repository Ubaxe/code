package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;

public class TestPickKey {
	Dungeon dungeon;
	Player player;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 1, 3);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
	}
	@Test
	public void test1() {
		Key key = new Key(0,3,2);
		dungeon.addEntity(key);
		player.playerMove(dungeon, player, null, "Left");
		player.moveLeft();
		assertEquals(0, player.getX());
		assertEquals(3, player.getY());
		assertEquals(key,player.getKey());
		System.out.println("----Test1 Pass (pick key)----");
	}

	@Test
	public void test2() {
		Key k1 = new Key(2,3,1);
		Key k2 = new Key(3,3,2);
		dungeon.addEntity(k1);
		dungeon.addEntity(k2);
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(player.getKey(),k1);
		assertFalse(dungeon.getEntities().contains(k1));
		assertTrue(dungeon.getEntities().contains(k2));
		System.out.println("----Test2 Pass (Player can not pick two keys)----");
	}
	
	@Test
	public void test3() {
		Dungeon dungeon = new Dungeon(5,5);
		Player player = new Player(dungeon, 1, 3);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
		Door door = new Door(3,3,2);
		Key key = new Key(2,3,2);
		dungeon.addEntity(door);
		dungeon.addEntity(key);
		player.playerMove(dungeon, player, null, "Right");
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX() + 1, player.getY());
		item = dungeon.getEntityExceptPlayer(entities);
		player.playerOpen(dungeon, player, item, "Right");
		
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(null,player.getKey());
		assertEquals(true, door.isOpen());
		//assertEquals(0, player.getY());
		System.out.println("----Test3 Pass (pick key and open door)----");
	}
	
	@Test
	public void test4() {
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
		Door door = new Door(3, 3, 2);
		Key key = new Key(2,3,1);
		dungeon.addEntity(door);
		dungeon.addEntity(key);
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(false,door.isOpen());
		assertEquals(2,player.getX());
		assertEquals(3,player.getY());
		assertEquals(player.getKey(),key);
		System.out.println("----Test4 Pass (player try to open door if player have different color key)----");
	}
	
	
}
