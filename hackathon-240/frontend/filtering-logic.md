
from typing import List, Dict, Union

# Define a member type for clarity
Member = Dict[str, Union[int, str, None]]

def filter_team_members(team_members: List[Member], team_id: int) -> Union[str, List[Member]]:
    # Check if the team_members list has any members
    if not team_members:
        return "No team members available to filter."
    
    # Filter the team_members based on team_id
    filtered_members = [member for member in team_members if member['team_id'] == team_id]
    
    # Check if no members are found for the given team_id
    if not filtered_members:
        return f"No members found for team_id {team_id}."
    
    return filtered_members

filtered_members = filter_team_members(team_members, team_id)

# Handle the return value explicitly
if isinstance(filtered_members, str):
    participants_data = {"error": filtered_members}  # For error messages, store in a dict
else:
    participants_data = {"team_members": filtered_members}  # Store the filtered members in a dict



Correct Code

from typing import Any
def get_selected_team_members() -> List[Any]:
    selected_team_members: List[Any] = []
    for team_member in team_members:
        if team_member.get("team_id") == team_id:
            selected_team_members.append(team_member)
    return selected_team_members


selected_members: List[Any] = get_selected_team_members()