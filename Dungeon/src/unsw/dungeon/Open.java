package unsw.dungeon;

public class Open implements Action{
	@Override
	public void action (Dungeon dungeon, Player player,Entity entity, String dire) {
		int vector = 0;
		if (entity instanceof Door) {
			switch(dire) {
				case "Up":
			    	vector = -1;
					if (player.getX() == entity.getX() && (player.getY() - entity.getY() == 1)) {
						if (dungeon.checkObstacle(entity.getX(),entity.getY() + vector,"player", "Up") == false && player.getKey() != null) {
							int door_color = ((Door) entity).getColor();
							int key_color = player.getKey().getColor();
							if (door_color == key_color) {
								((Door) entity).setOpen(true);
								dungeon.removeEntity(entity);
								player.setKey(null);
							}
						}
					}
					break;
				case "Down":
			    	vector = 1;
					if (player.getX() == entity.getX() && (player.getY() - entity.getY() == -1)) {
						if (dungeon.checkObstacle(entity.getX(),entity.getY() + vector,"player", "Down") == false && player.getKey() != null) {
							int door_color = ((Door) entity).getColor();
							int key_color = player.getKey().getColor();
							if (door_color == key_color) {
								dungeon.removeEntity(entity);
								((Door) entity).setOpen(true);
								player.setKey(null);
							}
						}
					} 
					break;
				case "Right":
			    	vector = 1;
					if (player.getY() == entity.getY() && (player.getX() - entity.getX() == -1)) {
						if (dungeon.checkObstacle(entity.getX() + vector, entity.getY(),"player", "Right") == false && player.getKey() != null) {
							int door_color = ((Door) entity).getColor();
							int key_color = player.getKey().getColor();
							if (door_color == key_color) {
								dungeon.removeEntity(entity);
								((Door) entity).setOpen(true);
								player.setKey(null);
							}
						}
					} 
					break;
				case "Left":
			    	vector = -1;
					if (player.getY() == entity.getY() && (player.getX() - entity.getX() == 1)) {
						if (dungeon.checkObstacle(entity.getX() + vector,entity.getY(),"player", "Left") == false && player.getKey() != null) {
							int door_color = ((Door) entity).getColor();
							int key_color = player.getKey().getColor();
							if (door_color == key_color) {
								dungeon.removeEntity(entity);
								((Door) entity).setOpen(true);
								player.setKey(null);
							}
						}
					} 
					break;
				default:
					System.out.println("Not correct direction");
			}
		}
	}
}
