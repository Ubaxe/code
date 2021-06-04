package unsw.dungeon;

import java.util.ArrayList;

public class Transfer implements Action {
	@Override
	public void action (Dungeon dungeon, Player player,Entity entity, String dire) {
		if (entity instanceof Portal) {
			if (player.getX() == entity.getX() && player.getY() == entity.getY()) {
				ArrayList<Entity> entities = (ArrayList<Entity>) dungeon.getEntities();
				for (Entity e: entities) {
					if (e instanceof Portal) {
						Portal e1 = (Portal) e;
						Portal e2 = (Portal) entity;
						if ((e1.getX() != e2.getX() || e1.getY() != e2.getY()) && e1.getColor() == e2.getColor()) {
							int x = e1.getX();
							int y = e1.getY();
							player.setX(x);
							player.setY(y);
							break;
						}
					}
				}
				
			}
		}
	}
}
