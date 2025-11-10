@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Данные пользователя</h1>
    
    @if($user)
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>  {{-- Автоматическое экранирование --}}
                    <td>{{ $user->email }}</td> {{-- Автоматическое экранирование --}}
                </tr>
            </tbody>
        </table>
    @else
        <p>Пользователь не найден.</p>
    @endif
</div>
@endsection