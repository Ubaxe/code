package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;

public class TestUstPortal {
	Dungeon dungeon;
	Player player;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 1, 1);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
	}
	
	@Test
	public void test1() {
		Portal p1 = new Portal(1, 1, 1);
		Portal p2 = new Portal(3, 1, 1);
		dungeon.addEntity(p1);
		dungeon.addEntity(p2);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerTransfer(dungeon, player, item, null);
		assertEquals(3, player.getX());
		assertEquals(1, player.getY());
		System.out.println("----Test1 Pass (use Portal to other one)----");
	}
	@Test
	public void test2() {
		Portal p1 = new Portal(1, 1, 2);
		Portal p2 = new Portal(1, 4, 1);
		Portal p3 = new Portal(4, 1, 2);
		Portal p4 = new Portal(2, 4, 1);
		dungeon.addEntity(p1);
		dungeon.addEntity(p2);
		dungeon.addEntity(p3);
		dungeon.addEntity(p4);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerTransfer(dungeon, player, item, null);
		assertEquals(4, player.getX());
		assertEquals(1, player.getY());
		player.setX(2);
		player.setY(3);
		player.playerMove(dungeon, player, null, "Down");
		assertEquals(1, player.getX());
		assertEquals(4, player.getY());
		player.playerMove(dungeon, player, null, "Up");
		player.playerMove(dungeon, player, null, "Up");
		player.playerMove(dungeon, player, null, "Up");
		assertEquals(4, player.getX());
		assertEquals(1, player.getY());
		System.out.println("----Test2 Pass (use multi-portal to transfer)----");
	}

}

