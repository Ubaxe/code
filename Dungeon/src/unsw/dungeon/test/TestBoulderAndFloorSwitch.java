package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;

public class TestBoulderAndFloorSwitch {
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
		FloorSwitch f1= new FloorSwitch(0,0);
		FloorSwitch f2= new FloorSwitch(0,1);
		FloorSwitch f3= new FloorSwitch(0,2);
		FloorSwitch f4= new FloorSwitch(0,3);
		dungeon.addEntity(f1);
		dungeon.addEntity(f2);
		dungeon.addEntity(f3);
		dungeon.addEntity(f4);
		assertFalse(dungeon.checkSwitch());
		System.out.println("----Test1 Pass (All Floor Switches are untriggered)----");
	}
	
	
	@Test
	public void test2() {
		Boulder boulder = new Boulder(2, 3);
		FloorSwitch f1= new FloorSwitch(3,3);
		dungeon.addEntity(boulder);
		dungeon.addEntity(f1);
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX()+1, player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerPushBoulder(dungeon, player, item, "Right");
		assertEquals(3, boulder.getX());
		assertEquals(3, boulder.getY());
		assertTrue(dungeon.checkSwitch());
		player.playerMove(dungeon, player, null, "Right");
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX()+1, player.getY());
		item = dungeon.getEntityExceptPlayer(entities);
		player.playerPushBoulder(dungeon, player, item, "Right");
		assertEquals(4, boulder.getX());
		assertEquals(3, boulder.getY());
		assertFalse(dungeon.checkSwitch());
		System.out.println("----Test2 Pass (Boulder and Floor Switch)----");
	}
	
	
}
