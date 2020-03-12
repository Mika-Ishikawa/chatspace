# chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :groups,  through:  :users_groups
- has_many :messages
- has_many :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Assosiation
- has_many :users,  through:  :users_groups
- has_many :messages
- has_many :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false,  foreign_key: true|
|group|reference|null: false,  foreign_key: true|
### Assosiation
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string|null: false|
|image|string||
|user|reference|null: false,  foreign_key: true|
|group|reference|null: false,  foreign_key: true|
### Assosiation
- belongs_to :user
- belongs_to :group