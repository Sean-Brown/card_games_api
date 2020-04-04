import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserTokenEntity1585971536585 implements MigrationInterface {
    name = 'AddUserTokenEntity1585971536585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_token` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `userId` int NULL, UNIQUE INDEX `IDX_9b8c6eac80e52d95241b573877` (`token`), UNIQUE INDEX `REL_d37db50eecdf9b8ce4eedd2f91` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user_token` ADD CONSTRAINT `FK_d37db50eecdf9b8ce4eedd2f918` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_token` DROP FOREIGN KEY `FK_d37db50eecdf9b8ce4eedd2f918`", undefined);
        await queryRunner.query("DROP INDEX `REL_d37db50eecdf9b8ce4eedd2f91` ON `user_token`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9b8c6eac80e52d95241b573877` ON `user_token`", undefined);
        await queryRunner.query("DROP TABLE `user_token`", undefined);
    }

}
