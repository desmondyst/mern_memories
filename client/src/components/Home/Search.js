import React, { useState } from "react";

import { MuiChipsInput } from "mui-chips-input";

import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import { getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";

const Search = () => {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    let navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            // search post
            searchPosts();
        }
    };

    const handleAddChip = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleDeleteChip = (tagToDelete) => {
        setTags(tags.filter((tag) => tag != tagToDelete));
    };

    const searchPosts = () => {
        // search posts if we have a search term that is not ""

        const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

        if (search.trim() || tags.length > 0) {
            //dispatch -> fetch search posts
            // dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            // /**
            //  * why does this client side even matter? backend already filter
            //  * because use can send over this url and other people can get the filtered result
            //  *  */

            //nah, dont do backend call, just push to route
            navigate(
                `/posts/search?searchQuery=${
                    search || "none"
                }&tags=${lowerCaseTags.join(",")} `
            );
        } else {
            navigate("/posts");
        }
    };

    return (
        <Paper
            sx={{ padding: "1rem", borderRadius: "1rem", marginBottom: "1rem" }}
            elevation={6}
        >
            <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                // onKeyDown={handleKeyPress}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <MuiChipsInput
                hideClearAll
                fullWidth
                value={tags}
                onAddChip={handleAddChip}
                onDeleteChip={handleDeleteChip}
                label="Search Tags"
                variant="outlined"
                sx={{ marginTop: "0.5rem" }}
            />
            <Button
                variant="contained"
                fullWidth
                onClick={searchPosts}
                color="primary"
                sx={{ marginTop: "0.5rem" }}
            >
                Search Post
            </Button>
        </Paper>
    );
};

export default Search;
