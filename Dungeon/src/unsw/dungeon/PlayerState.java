package unsw.dungeon;

public interface PlayerState {
	public void changeInvincibleState(Player player);
	public void changeNormalState(Player player);
	public void changeGameOverState(Player player);
}
