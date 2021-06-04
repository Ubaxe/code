package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;

public class TestPickSword {
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
		Sword sword = new Sword(2, 3);
		dungeon.addEntity(sword);
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(player.getSword(),sword);
		System.out.println("----Test1 Pass (player pick sword)----");
	}
	
	@Test
	public void test2() {
		Sword s1 = new Sword(2,3);
		Sword s2 = new Sword(3,3);
		dungeon.addEntity(s1);
		dungeon.addEntity(s2);
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(player.getSword(),s1);
		assertFalse(dungeon.getEntities().contains(s1));
		assertTrue(dungeon.getEntities().contains(s2));
		System.out.println("----Test2 Pass (Player can not pick two swords)----");
	}
	
	
}
