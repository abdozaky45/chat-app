const GroupModel = require('./../models/groupModel');

async function createGroup(request, response) {
    try {
        const { adminId, groupName, members } = request.body;

        if (!adminId || !groupName) {
            return response.status(400).json({
                message: "Admin ID and group name must be provided",
                error: true
            });
        }

        // 1. Create a new group
        const newGroup = new GroupModel({
            name: groupName,
            admin: adminId,
            members: [adminId, ...(members || [])] 
        });

        const savedGroup = await newGroup.save();

        return response.status(201).json({
            message: "New group created successfully",
            data: {
                group: savedGroup
            },
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = createGroup;
