package unsw.dungeon;

public class Push implements Action {
	@Override
	public void action (Dungeon dungeon, Player player,Entity entity, String dire) {
		int vector = 0;
		if (entity instanceof Boulder) {
			switch(dire) {
				case "Up":
			    	vector = -1;
					if (player.getX() == entity.getX() && (player.getY() - entity.getY() == 1)) {
						if (dungeon.checkObstacle(entity.getX(),entity.getY() + vector,"boulder", "Up") == false) {
							entity.y().set(entity.getY() - 1);
						}
					}
					break;
				case "Down":
			    	vector = 1;
					if (player.getX() == entity.getX() && (player.getY() - entity.getY() == -1)) {
						if (dungeon.checkObstacle(entity.getX(),entity.getY() + vector,"boulder", "Down") == false) {
							entity.y().set(entity.getY() + 1);
						}
					} 
					break;
				case "Right":
			    	vector = 1;
					if (player.getY() == entity.getY() && (player.getX() - entity.getX() == -1)) {
						if (dungeon.checkObstacle(entity.getX() + vector, entity.getY(),"boulder", "Down") == false) {
							entity.x().set(entity.getX() + 1);
						}
					} 
					break;
				case "Left":
			    	vector = -1;
					if (player.getY() == entity.getY() && (player.getX() - entity.getX() == 1)) {
						if (dungeon.checkObstacle(entity.getX() + vector,entity.getY(),"boulder", "Left") == false) {
							entity.x().set(entity.getX() - 1);
						}
					} 
					break;
				default:
					System.out.println("Not correct direction");
			}
		}
	}
}
