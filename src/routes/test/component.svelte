<script context="module" lang="ts">
    import FileDrop from "$lib/components";
    import type { Files } from "$lib/file";
    import type { FileDropOptions } from "$lib/options";
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async function ({ page }) {
        const { query } = page;
        function getNumber(key: string): number | undefined {
            const str = query.get(key);
            const n = parseInt(str);
            if (!isNaN(n)) {
                return n;
            }
            return undefined;
        }
        function getBool(key: string): boolean | undefined {
            const b = query.get(key);
            if (b === "true") {
                return true;
            }
            if (b === "false") {
                return false;
            }
            return undefined;
        }
        function getAccept(): string | string[] | undefined {
            const accept = query.getAll("accept").filter((v) => v.length > 0);
            if (accept.length === 1) {
                return accept[0];
            }
            if (accept.length > 1) {
                return accept;
            }
            return undefined;
        }
        const opts: FileDropOptions = {
            accept: getAccept(),
            clickToUpload: getBool("clickToUpload"),
            disabled: getBool("disabled"),
            hideInput: getBool("hideInput"),
            fileLimit: getNumber("fileLimit"),
            maxSize: getNumber("maxSize"),
            minSize: getNumber("minSize"),
            windowDrop: getBool("windowDrop"),
            multiple: getBool("multiple"),
            tabIndex: getNumber("tabIndex"),
        };
        return { props: { opts } };
    };
</script>

<script lang="ts">
    // import fileSize from "filesize";
    export let opts: FileDropOptions = {};
    let files: Files;
    console.log(opts);
</script>

<FileDrop {...opts} on:filedrop={(e) => (files = e.detail.files)} />

{#if files}
    <h3>Accepted files</h3>
    <ul>
        {#each files.accepted as file}
            <li>{file.name}</li>
        {/each}
    </ul>
    <h3>Rejected files</h3>
    <ul>
        {#each files.rejected as rejected}
            <li>{rejected.file.name} - {rejected.error.message}</li>
        {/each}
    </ul>
{/if}
