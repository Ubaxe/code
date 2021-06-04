package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.Dungeon;
import unsw.dungeon.Enemy;
import unsw.dungeon.Entity;
import unsw.dungeon.GameOverState;
import unsw.dungeon.NormalState;
import unsw.dungeon.Player;
import unsw.dungeon.Sword;

public class TestEnemyKillPlayer {
	Dungeon dungeon;
	Player player;
	Enemy enemy;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 2, 3);
		enemy = new Enemy(dungeon, 3, 3);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
		dungeon.addEntity(enemy);
	}
	
	@Test
	public void test1() {
		assertEquals(player.getPlayerState().getClass(), new NormalState().getClass());
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(3, player.getX());
		assertEquals(3, player.getY());
		assertEquals(player.getPlayerState().getClass(), new GameOverState().getClass());
		System.out.println("----Test1 Pass (player killed by enemy)----");
	}
	

}
