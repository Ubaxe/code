package unsw.dungeon;

public class BigEnemy extends Enemy {	
	private Dungeon dungeon;
	public BigEnemy(Dungeon dungeon, int x, int y) {
		super(dungeon, x, y);
		this.dungeon = dungeon;
	}
	
}
