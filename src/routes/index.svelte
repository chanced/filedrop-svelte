<script lang="ts">
	import filedrop from "$actions/filedrop";
</script>

<h1>FileDrop Examples</h1>

<h2>Action</h2>
<div class="container">
	<div use:filedrop class="filedrop">
		<input type="file" />
	</div>
</div>

<style>
	.container {
		width: 300px;
	}
	.filedrop {
		background-color: silver;
		min-height: 100px;
	}
</style>
