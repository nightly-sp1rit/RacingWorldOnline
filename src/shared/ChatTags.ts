type Tag = {
    TagIcon: string,
    TagName: string,
    Owners: (string | number)[]
}

export const Tags = [
    // Values can be either a ~string~ or ~number~ (Name, UserID)

    /*

    Tag Template

    Tag: {
        TagIcon: "",
        TagName: "",
        Owners: [ 1 ]
    }

    */

    {
        TagIcon: "", // AssetID (rbxassetid://)
        TagName: "Creator",
        Owners: [
            3748436334 // in this case I used UserID for name change support but you can use Username instead
        ]
    },

    {
        TagIcon: "",
        TagName: "Developer",
        Owners: [
            3748436334
        ]
    },

    {
        TagIcon: "",
        TagName: "Administrator",
        Owners: [
            3748436334 
        ]
    },
    
    {
        TagIcon: "",
        TagName: "Moderator",
        Owners: [
             
        ]
    },
    
    {
        TagIcon: "",
        TagName: "Helper",
        Owners: [
            
        ]
    },

    {
        TagIcon: "",
        TagName: "Tester",
        Owners: [
            
        ]
    }
];

const IsGroupBased = true; // Change this in case you want it to use Owners
const RoleGroup = 16167825 // Group where to take roles from


export const Groups = [
    {
        Role: "👑 Founder",
        Rank: 255, // Does nothing at the moment, probably a deprecated property in the future
        TagInstance: Tags[0]
    },

    {
        Role: "🔨 Group Staff",
        Rank: 255,
        TagInstance: Tags[2]
    },

    {
        Role: "🏅 Beta Tester",
        Rank: 50,
        TagInstance: Tags[5]
    }
];

export function GetPlayerTags(Player: Player): Tag[] {
    if (IsGroupBased) {
        const CurrentTags: Tag[] = [];

        // If Player has a certain role in the group, they get the tag for that role.

        Groups.forEach((Group, i) => {
            if (Player.GetRoleInGroup(RoleGroup) === Group.Role) {
                CurrentTags.push(Group.TagInstance);
            }
        });
        
        return CurrentTags;
    } else {
        const CurrentTags: Tag[] = [];

        Tags.forEach((Tag, i) => {
            Tag.Owners.forEach((Owner: string | number, i2) => {
                if (Player.UserId === Owner || Player.Name === Owner) {
                    CurrentTags.push(Tag);
                }
            });
        });

        return CurrentTags;
    }
}