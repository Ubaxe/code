package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;
public class TestPickKeyAndOpenDoor {
	Dungeon dungeon;
	Player player;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 0, 1);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
	}
	
	
	@Test
	public void test1() {
		Door door = new Door(2,1,2);
		Key key = new Key(1,1,2);
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
		System.out.println("----Test1 Pass (pick key and open door)----");
	}
	@Test
	public void test2() {
		Door door = new Door(1, 1, 2);
		dungeon.addEntity(door);
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(0,player.getX());
		assertEquals(1,player.getY());
		assertEquals(false,door.isOpen());
		System.out.println("----Test2 Pass (player try to open door if player does not have key)----");
	}
	
	

}
