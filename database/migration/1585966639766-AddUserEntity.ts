import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserEntity1585966639766 implements MigrationInterface {
    name = 'AddUserEntity1585966639766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(255) NOT NULL, `passwordHash` varchar(255) NOT NULL, `dateCreated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_da5934070b5f2726ebfd3122c8` (`userName`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_da5934070b5f2726ebfd3122c8` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
