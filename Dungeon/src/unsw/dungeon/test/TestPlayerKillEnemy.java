package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.Dungeon;
import unsw.dungeon.Enemy;
import unsw.dungeon.Entity;
import unsw.dungeon.InvincibilityPotion;
import unsw.dungeon.InvincibleState;
import unsw.dungeon.NormalState;
import unsw.dungeon.Player;
import unsw.dungeon.Sword;

public class TestPlayerKillEnemy {
	
	Dungeon dungeon;
	Player player;
	Enemy enemy;
	@Before
	public void setup() {
		dungeon = new Dungeon(6,6);
		player = new Player(dungeon, 3, 3);
		enemy = new Enemy(dungeon, 6,3);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
		dungeon.addEntity(enemy);
	}
	
	@Test
	public void test1() {
		Sword sword = new Sword(4, 3);
		dungeon.addEntity(sword);
		// player Move from (3,3) to (4,3) and pick up sword
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(sword,player.getSword());
		assertEquals(5, player.getSword().getHit());
		// enemy now moves to (5,3)
		assertEquals(5, enemy.getX());
		assertEquals(3, enemy.getY());
		// player moves to (5,3) and kill the enemy
		player.playerMove(dungeon, player, null, "Right");
		// there is only player on (5,3) now
		List<Entity> entities = dungeon.getEntity(5, 3);
		for (Entity e1: entities) {
			assertEquals(player, e1);
		}
		assertEquals(4, player.getSword().getHit());
		System.out.println("----Test1 Pass (player use sword to kill enemy)----");
	}
	
	@Test
	public void test2() {
		Enemy enemy1 = new Enemy(dungeon, 5, 3);
		InvincibilityPotion potion = new InvincibilityPotion(4, 3);
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
		dungeon.addEntity(enemy1);
		dungeon.addEntity(potion);
		assertEquals(player.getPlayerState().getClass(), new NormalState().getClass());
		// player move from (1,3) to (2,3), pick up the potion and change to the invincible state
		player.playerMove(dungeon, player, null, "Right");
		assertEquals(player.getPlayerState().getClass(), new InvincibleState().getClass());
		assertEquals(4, player.getX());
		assertEquals(3, player.getY());
		// there is no potion on (2,3) any more
		List<Entity> entities = dungeon.getEntity(4, 3);
		// on (2,3), player pick up potion first, and then kill enemy, there is only player on (2,3)
		for (Entity e1: entities) {
			assertEquals(player, e1);
		}
		System.out.println("----Test2 Pass (player kill enemy special condition)----");
	}
	
}
