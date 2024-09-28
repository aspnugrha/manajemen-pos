<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('transaction_no', 100);
            $table->dateTime('transaction_date');
            $table->dateTime('transaction_payment_date')->nullable();
            $table->string('customer_name', 100);
            $table->string('customer_email', 100)->nullable();
            $table->string('customer_phone', 100)->nullable();
            $table->string('customer_address', 100)->nullable();
            $table->double('total_qty')->default(0);
            $table->double('total_amount')->default(0);
            $table->double('total_discount')->default(0);
            $table->double('total')->default(0);
            $table->double('total_payment')->default(0);
            $table->double('total_change')->default(0);
            $table->enum('status', ['cart', 'transaction', 'payment', 'done']);
            $table->tinyInteger('is_draft')->default('0')->nullable();
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('transaction_details', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('id_slug', 100);
            $table->string('transaction_id', 100);
            $table->string('item_id', 100);
            $table->string('item_detail_id', 100);
            $table->double('qty');
            $table->double('hpp')->default(0);
            $table->double('weight')->default(0);
            $table->double('amount')->default(0);
            $table->double('discount')->default(0);
            $table->double('total_weight')->default(0);
            $table->double('total_amount')->default(0);
            $table->double('total_discount')->default(0);
            $table->double('total')->default(0);
            $table->string('created_by', 50);
            $table->string('updated_by', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('transaction_details');
    }
};
