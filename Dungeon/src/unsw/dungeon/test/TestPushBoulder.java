package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;


public class TestPushBoulder {
	
	Dungeon dungeon;
	Player player;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 3, 3);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
	}
	
	
	@Test
	public void test1() {
		Boulder boulder = new Boulder(4, 3);
		dungeon.addEntity(boulder);
		Wall wall = new Wall(5,3);
		dungeon.addEntity(wall);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX()+1, player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerPushBoulder(dungeon, player, item, "Right");
		assertEquals(4, boulder.getX());
		assertEquals(3, boulder.getY());
		System.out.println("----Test1 Pass (push boulder and wall blocked)----");
	}
	
	@Test
	public void test2(){
		Boulder boulder = new Boulder(4, 3);
		dungeon.addEntity(boulder);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX()+1, player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerPushBoulder(dungeon, player, item, "Right");
		assertEquals(5, boulder.getX());
		assertEquals(3, boulder.getY());
		System.out.println("----Test2 Pass (push boulder)----");
	}
	
	
	@Test
	public void test3() {
		Boulder b1 = new Boulder(2, 1);
		Boulder b2 = new Boulder(3, 1);
		dungeon.addEntity(b1);
		dungeon.addEntity(b2);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX()+1, player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerPushBoulder(dungeon, player, item, "Right");
		assertEquals(3, player.getX());
		assertEquals(3, player.getX());
		assertEquals(2, b1.getX());
		assertEquals(1, b1.getY());
		System.out.println("----Test3 Pass (player can not push two boulders)----");
	}
	
	
}
