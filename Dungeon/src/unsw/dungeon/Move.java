package unsw.dungeon;

import java.util.Observable;

public class Move extends Observable implements Action {

	@Override
	public void action(Dungeon dungeon, Player player, Entity entity, String dire) {
		int vector = 0;
		switch(dire) {
			case "Up":
		    	vector = -1;
				if (dungeon.checkObstacle(player.getX(),player.getY() + vector,"player",  "Up") == false) {
					player.moveUp();
					setChanged();
					notifyObservers();
				}
				break;
			case "Down":
		    	vector = 1;
				if (dungeon.checkObstacle(player.getX(),player.getY() + vector,"player", "Down") == false) {
					player.moveDown();
					setChanged();
					notifyObservers();
				}
				break;
			case "Right":
		    	vector = 1;
				if (dungeon.checkObstacle(player.getX() + vector, player.getY(),"player", "Right") == false) {
					player.moveRight();
					setChanged();
					notifyObservers();
				}
				break;
			case "Left":
		    	vector = -1;
				if (dungeon.checkObstacle(player.getX() + vector,player.getY(),"player", "Left") == false) {
					player.moveLeft();
					setChanged();
					notifyObservers();
				}
				break;
			default:
				System.out.println("Not correct direction");
		}
		
	}

}
