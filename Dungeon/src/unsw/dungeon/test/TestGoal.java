package unsw.dungeon.test;
import unsw.dungeon.goal.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;

public class TestGoal {
	Dungeon dungeon;
	Player player;
	Goal andGoal;
	Goal orGoal;
	Goal exitGoal;
	Goal switchGoal;
	Goal enemyGoal;
	Goal treasureGoal;
	
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
		player = new Player(dungeon, 1, 0);
		andGoal = new AndGoal();
		orGoal = new OrGoal();
		exitGoal = new ExitGoal();
		switchGoal = new FloorSwitchGoal();
		enemyGoal = new KillEnemyGoal();
		treasureGoal = new TreasureGoal();
		dungeon.setPlayer(player);
		dungeon.addEntity(player);
	}
	
	// test for single treasure goal
	@Test
	public void test1() {
		andGoal.addGoal(treasureGoal);
		Treasure t = new Treasure(2,0);
		dungeon.addEntity(t);
		assertFalse(andGoal.isSatisfied(dungeon));
		player.playerMove(dungeon, player, null, "Right");
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerPick(dungeon, player, item, null);
		assertTrue(andGoal.isSatisfied(dungeon));
		System.out.println("----Test1 Pass (collect Treasure Goal)----");
	}
	
	// test for single kill all enemies goal
	@Test
	public void test2() {
		Enemy enemy = new Enemy(dungeon, 3,0);
		Sword sword = new Sword(2,0);
		dungeon.addEntity(enemy);
		dungeon.addEntity(sword);
		andGoal.addGoal(enemyGoal);
		assertFalse(andGoal.isSatisfied(dungeon));
		player.playerMove(dungeon, player, null, "Right");
		assertTrue(andGoal.isSatisfied(dungeon));
	}
	
	// test for single exit goal
	@Test
	public void test3() {
		andGoal.addGoal(exitGoal);
		Exit exit = new Exit(2,0);
		dungeon.addEntity(exit);
		assertFalse(andGoal.isSatisfied(dungeon));
		player.playerMove(dungeon, player, null, "Right");
		assertTrue(andGoal.isSatisfied(dungeon));
	}
	
	// test for single push boulder onto floorswitch goal
	@Test
	public void test4() {
		andGoal.addGoal(switchGoal);
		Boulder boulder = new Boulder(2,0);
		FloorSwitch fswitch = new FloorSwitch(3,0);
		dungeon.addEntity(boulder);
		dungeon.addEntity(fswitch);
		assertFalse(andGoal.isSatisfied(dungeon));
		player.playerPushBoulder(dungeon, player, boulder, "Right");
		assertTrue(andGoal.isSatisfied(dungeon));
	}
	
	// test for combined goals
	@Test
	public void test5() {
		andGoal.addGoal(exitGoal);
		orGoal.addGoal(treasureGoal);
		orGoal.addGoal(switchGoal);
		andGoal.addGoal(orGoal);
		Exit exit = new Exit(3,0);
		Treasure t = new Treasure(2,0);
		Boulder boulder = new Boulder(3,3);
		FloorSwitch fswitch = new FloorSwitch(2,2);
		dungeon.addEntity(boulder);
		dungeon.addEntity(fswitch);
		dungeon.addEntity(t);
		dungeon.addEntity(exit);
		player.playerMove(dungeon, player, null, "Right");
		// treasure goal satisfied
		assertTrue(treasureGoal.isSatisfied(dungeon));
		// switch goal unsatisfied
		assertFalse(switchGoal.isSatisfied(dungeon));
		// orGoal satisfied
		assertTrue(orGoal.isSatisfied(dungeon));
		// andGoal unsatisfied
		assertFalse(andGoal.isSatisfied(dungeon));
		// move right to the exit and satisfy the exit goal and andGoal
		player.playerMove(dungeon, player, null, "Right");
		assertTrue(exitGoal.isSatisfied(dungeon));
		assertTrue(andGoal.isSatisfied(dungeon));
	}
	
}
