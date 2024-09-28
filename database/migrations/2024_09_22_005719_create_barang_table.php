<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_categories', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->tinyInteger('enabled')->default('1')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('item_units', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->tinyInteger('enabled')->default('1')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('item_brands', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->tinyInteger('enabled')->default('1')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('category_id', 50);
            $table->string('unit_id', 50);
            $table->string('brand_id', 100);
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->double('total_stock')->nullable();
            $table->tinyInteger('enabled')->default('1')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('item_details', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('item_id', 50);
            $table->string('item_code', 50)->nullable();
            $table->string('name', 100)->nullable();
            $table->text('description')->nullable();
            $table->double('weight')->nullable()->comment('gram');
            $table->double('stock')->nullable();
            $table->double('hpp')->nullable();
            $table->double('amount')->nullable();
            $table->double('discount')->nullable();
            $table->double('total')->nullable();
            $table->tinyInteger('enabled')->default('1')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('item_images', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('item_id', 50);
            $table->string('image', 100);
            $table->text('description')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_categories');
        Schema::dropIfExists('item_units');
        Schema::dropIfExists('item_brands');
        Schema::dropIfExists('items');
        Schema::dropIfExists('item_details');
        Schema::dropIfExists('item_images');
    }
};
