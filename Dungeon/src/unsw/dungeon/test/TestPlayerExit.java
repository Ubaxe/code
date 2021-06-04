package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;

public class TestPlayerExit {
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
		Exit exit = new Exit(2,3);
		dungeon.addEntity(exit);
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(2, player.getX());
		assertEquals(3, player.getY());
		assertEquals(player.getPlayerState().getClass(),new GameOverState().getClass());
		System.out.println("----Test1 Pass (player exit successfully)----");
	}
	
}
