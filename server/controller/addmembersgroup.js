const GroupModel = require('./../models/groupModel');

async function addMembersToGroup(request, response) {
    try {
        const { adminId, groupId, newMembers } = request.body;

        if (!adminId || !groupId || !Array.isArray(newMembers)) {
            return response.status(400).json({
                message: "Admin ID, group ID, and new members must be provided",
                error: true
            });
        }

        // Find the group to update
        const group = await GroupModel.findById(groupId);

        if (!group) {
            return response.status(404).json({
                message: "Group not found",
                error: true
            });
        }

        // Check if the user making the request is the admin of the group
        if (group.admin.toString() !== adminId.toString()) {
            return response.status(403).json({
                message: "Only the admin can add new members",
                error: true
            });
        }

        // Add new members to the group
        const updatedGroup = await GroupModel.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: { $each: newMembers } } },
            { new: true }
        );

        return response.status(200).json({
            message: "Members added successfully",
            data: updatedGroup,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = addMembersToGroup;
