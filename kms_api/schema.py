CREATE_PROPOSAL = {
    "type": "object",
    "properties": {
            "name": {"type": "string"},
            "description": {"type": "string"},
            "created_by": {"type": "string"},
            "resolved_by": {"type": "string"},
            "status": {"enum": ["pending", "accepted", "rejected", "applied"]},
            "operations": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "string"},
                        "action": {"enum":["remove_tags","add_tags", "replace_tags"]},
                        "payload": {}
                    },
                    "required": ["id", "action", "payload"],

                },
                "minItems": 1
            },
    },
    "required": ["name", "status", "operations", "created_by"],
}

RESOLVE_PROPOSAL = {
    "type": "object",
    "properties": {
        "status": {"enum": ["pending", "accepted", "rejected", "applied"]},
        "resolved_by": {"type": "string"}
    },
    "required": ["status", "resolved_by"]
}