<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice {{ $transactions->transaction_no }} | Point Of Sales</title>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');

        *{
            font-family: "Quicksand", sans-serif;
            font-optical-sizing: auto;
            font-weight: <weight>;
            font-style: normal;
            color: #333;
            padding: 0;
            margin: 0;
        }

        .container{
            padding: 10px;
        }

        .invoice{
            padding: 15px;
            border: 1px solid #333;
            border-radius: 10px;
        }

        .head{
            margin-top: 15px;
            margin-bottom: 15px;
            text-align: center;
        }

        .text-heading{
            font-size: 25px;
            font-weight: bold;
        }

        .customer-info{
            margin-top: 15px;
            margin-bottom: 15px;
        }

        .order-list{
            padding: 10px;
        }

        .payment-info{
            margin-top: 15px;
            margin-bottom: 20px;
        }

        .table_component {
            overflow: auto;
            width: 100%;
        }
        
        .table_component table {
            border: 1px solid #dededf;
            height: 100%;
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
            border-spacing: 1px;
            text-align: left;
        }
        
        .table_component caption {
            caption-side: top;
            text-align: left;
        }
        
        .table_component th {
            border: 1px solid #dededf;
            background-color: #eceff1;
            color: #000000;
            padding: 5px;
        }
        
        .table_component td {
            border: 1px solid #dededf;
            background-color: #ffffff;
            color: #000000;
            padding: 5px 8px;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="invoice">
            <div class="head">
                <h4 class="text-heading">INVOICE</h4>
                <span>Transaction No : {{ $transactions->transaction_no }}</span>
            </div>
            <div class="customer-info">
                <table style="width: 100%;">
                    <tbody>
                        <tr>
                            <td style="width: 12%;">Name</td>
                            <td style="width: 10px;text-align: center;">:</td>
                            <td>{{ $transactions->customer_name }}</td>
                            <td style="width: 25%;"></td>
                            <td>Transaction Date</td>
                            <td style="width: 10px;text-align: center;">:</td>
                            <td>{{ date('d F Y, H:i:s', strtotime($transactions->transaction_date)) }}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td style="width: 10px;text-align: center;">:</td>
                            <td>{{ $transactions->customer_email }}</td>
                            <td></td>
                            <td>Payment Date</td>
                            <td style="width: 10px;text-align: center;">:</td>
                            <td>{{ date('d F Y, H:i:s', strtotime($transactions->transaction_payment_date)) }}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td style="width: 10px;text-align: center;">:</td>
                            <td>{{ $transactions->customer_phone }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="list-order">
                <div class="table_component" role="region" tabindex="0">
                <table>
                    <tbody>
                        @foreach ($transaction_detail as $item)
                        <tr>
                            <td style="width: 50%;"><span style="font-size: 16px;">{{ $item->item_name }}</span> <br> <small><i>{{ $item->variation_name }}</i></small></td>
                            <td style="text-align: right;">x{{ $item->qty }}</td>
                            <td style="text-align: right;">{{ number_format($item->total, 0, ".", '.') }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold;font-size: 17px;">
                            <td style="text-align: right;">Total</td>
                            <td style="text-align: right">x{{ $transactions->total_qty }}</td>
                            <td style="text-align: right">Rp {{ number_format($transactions->total, 0, ".", ".") }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="payment-info">
                <table style="width: 100%;">
                    <tr>
                        <td style="width: 85%;text-align: right;">Payment</td>
                        <td style="width: 10px;text-align: center;">:</td>
                        <td style="text-align: right;font-size: 18px;font-weight: bold;">Rp {{ number_format($transactions->total_payment, 0, '.', '.') }}</td>
                    </tr>
                    @if ($transactions->total_change)
                    <tr>
                        <td style="text-align: right;">Change</td>
                        <td style="width: 10px;text-align: center;">:</td>
                        <td style="text-align: right;font-size: 16px;">Rp {{ number_format($transactions->total_payment, 0, '.', '.') }}</td>
                    </tr>
                    @endif
                </table>
            </div>
        </div>
    </div>

    <script>
        window.print();
    </script>
</body>
</html>