package unsw.dungeon;

import java.util.ArrayList;



public class Portal extends Entity {

	private int color;
	
	public Portal(int x, int y,int colour) {
		super(x, y);
		this.color = colour;
	}
	
	public int getColor () {
		return this.color;
	}
	
	
}
