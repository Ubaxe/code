package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;
public class TestSetPlayer {
	
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
		assertEquals(dungeon.getPlayer().getX(), player.getX());
		assertEquals(dungeon.getPlayer().getY(), player.getY());
		System.out.println("----Test1 Pass (set player)----");
	}

}
