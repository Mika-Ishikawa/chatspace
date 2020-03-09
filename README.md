# chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups,  through:  :users_groups
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Assosiation
- has_many :users,  through:  :users_groups
- has_many :messages

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,  foreign_key: true|
|group_id|integer|null: false,  foreign_key: true|
### Assosiation
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string|null: false|
|image|string||
|user_id|integer|null: false,  foreign_key: true|
|group_id|integer|null: false,  foreign_key: true|
### Assosiation
- belongs_to :user
- belongs_to :group