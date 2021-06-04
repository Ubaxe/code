package unsw.dungeon.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import unsw.dungeon.*;
public class TestBoulderInCorner {
	Dungeon dungeon;
	@Before
	public void setup() {
		dungeon = new Dungeon(5,5);
	}
	
	@Test
	public void test1() {
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
		Boulder b1 = new Boulder(1,1);
		Boulder b2 = new Boulder(4,1);
		Boulder b3 = new Boulder(1,4);
		Boulder b4 = new Boulder(4,4);
		Boulder b5 = new Boulder(2,2);
		dungeon.addEntity(b1);
		dungeon.addEntity(b2);
		dungeon.addEntity(b3);
		dungeon.addEntity(b4);
		dungeon.addEntity(b5);
		int check = dungeon.BoulderInCorner();
		assertEquals(check,1);
		System.out.println("----Test1 Pass (Count boulder except in corner)----");
	}
	
	
}
