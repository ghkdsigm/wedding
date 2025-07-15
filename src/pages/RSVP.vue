<template>
	<section class="min-h-screen bg-pink-50 p-6">
		<h2 class="text-2xl font-semibold text-center mb-4">참석 여부 알려주세요</h2>
		<form class="max-w-md mx-auto space-y-4">
			<input
				type="text"
				placeholder="이름"
				class="w-full border p-2 rounded"
			/>
			<select class="w-full border p-2 rounded">
				<option>참석</option>
				<option>불참</option>
			</select>
			<button class="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">제출하기</button>
		</form>
	</section>
</template>

<script></script>
