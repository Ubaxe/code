package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Test;

import unsw.dungeon.Boulder;
import unsw.dungeon.Door;
import unsw.dungeon.Dungeon;
import unsw.dungeon.Entity;
import unsw.dungeon.FloorSwitch;
import unsw.dungeon.Key;
import unsw.dungeon.Player;
import unsw.dungeon.Portal;
import unsw.dungeon.Treasure;
import unsw.dungeon.Wall;
/*
public class TestBigMap {
	@Test
	public void test() {
		Dungeon dungeon = new Dungeon(5,5);
		Wall w1 = new Wall(0,0);
		Wall w2 = new Wall(1,0);
		Wall w3 = new Wall(2,0);
		Wall w4 = new Wall(3,0);
		Wall w5 = new Wall(4,0);
		Wall w6 = new Wall(5,0);
		Wall w7 = new Wall(0,1);
		Wall w8 = new Wall(0,2);
		Wall w9 = new Wall(0,3);
		Wall w10 = new Wall(0,4);
		Wall w11 = new Wall(0,5);
		Wall w12 = new Wall(1,5);
		Wall w13 = new Wall(2,5);
		Wall w14 = new Wall(3,5);
		Wall w15 = new Wall(4,5);
		Wall w16 = new Wall(5,5);
		Wall w17 = new Wall(5,1);
		Wall w18 = new Wall(5,2);
		Wall w19 = new Wall(5,3);
		Wall w20 = new Wall(5,4);
		Wall w21 = new Wall(2,1);
		Wall w22 = new Wall(3,2);
		Wall w23 = new Wall(3,3);
		Wall w24 = new Wall(3,4);
		Portal p1 = new Portal(2,2,0);
		Portal p2 = new Portal(4,4,1);
		Boulder b1 = new Boulder(2,3);
		FloorSwitch f1 = new FloorSwitch(2,4);
		Treasure t1 = new Treasure(3,1);
		Door d1 = new Door(4,2,"Red");
		Key k1 = new Key(4,3,"Red");
		dungeon.addEntity(w1);
		dungeon.addEntity(w2);
		dungeon.addEntity(w3);
		dungeon.addEntity(w4);
		dungeon.addEntity(w5);
		dungeon.addEntity(w6);
		dungeon.addEntity(w7);
		dungeon.addEntity(w8);
		dungeon.addEntity(w9);
		dungeon.addEntity(w10);
		dungeon.addEntity(w11);
		dungeon.addEntity(w12);
		dungeon.addEntity(w13);
		dungeon.addEntity(w14);
		dungeon.addEntity(w15);
		dungeon.addEntity(w16);
		dungeon.addEntity(w17);
		dungeon.addEntity(w18);
		dungeon.addEntity(w19);
		dungeon.addEntity(w20);
		dungeon.addEntity(w21);
		dungeon.addEntity(w22);
		dungeon.addEntity(w23);
		dungeon.addEntity(w24);
		dungeon.addEntity(p1);
		dungeon.addEntity(p2);
		dungeon.addEntity(b1);
		dungeon.addEntity(f1);
		dungeon.addEntity(t1);
		dungeon.addEntity(d1);
		dungeon.addEntity(k1);
		Player player = new Player(dungeon, 1, 1);
		dungeon.setPlayer(player);
		player.playerMove(dungeon, player, null, "Up");
		player.playerMove(dungeon, player, null, "Left");
		player.playerMove(dungeon, player, null, "Down");
		player.playerMove(dungeon, player, null, "Right");
		ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		// player use portal to transfer from 2,2 to 4,4
		assertEquals(4,player.getX());
		assertEquals(4,player.getY());
		Entity item = dungeon.getEntityExceptPlayer(entities);
		player.playerMove(dungeon, player, null, "Up");
		// player pick key
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		item = dungeon.getEntityExceptPlayer(entities);
		assertEquals(k1,player.getKey());
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY() - 1);
		item = dungeon.getEntityExceptPlayer(entities);
		// open the door use the same color key
		assertFalse(d1.isOpen());
		assertEquals(4,player.getX());
		assertEquals(3,player.getY());
		//assertEquals(null,player.getKey());
		player.playerOpen(dungeon, player, item, "Up");
		assertTrue(d1.isOpen());
		player.playerMove(dungeon, player, null, "Up");
		assertEquals(4,player.getX());
		assertEquals(2,player.getY());
		assertEquals(null,player.getKey());
		player.playerMove(dungeon, player, null, "Up");
		player.playerMove(dungeon, player, null, "Left");
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		item = dungeon.getEntityExceptPlayer(entities);
		dungeon.checkTreasure();
		assertTrue(dungeon.checkTreasure());
		player.playerMove(dungeon, player, null, "Right");
		player.playerMove(dungeon, player, null, "Down");
		player.playerMove(dungeon, player, null, "Down");
		assertEquals(4,player.getX());
		assertEquals(3,player.getY());
		player.playerMove(dungeon, player, null, "Down");
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY());
		item = dungeon.getEntityExceptPlayer(entities);
		// the player use portal transfer back to 2,2
		assertEquals(2,player.getX());
		assertEquals(2,player.getY());
		entities = (ArrayList<Entity>) dungeon.getEntity(player.getX(), player.getY() + 1);
		item = dungeon.getEntityExceptPlayer(entities);
		player.playerPushBoulder(dungeon, player, item, "Down");
		assertEquals(2,player.getX());
		assertEquals(2,player.getY());
		assertTrue(dungeon.checkSwitch());
		System.out.println("----Test Pass (Big Map)----");
	}
}
 */
